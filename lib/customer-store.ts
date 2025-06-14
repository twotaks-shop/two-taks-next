import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ShopifyCustomer,
  ShopifyCustomerAccessToken,
  CustomerCreateInput,
  CustomerLoginInput,
} from './types';
import {
  createCustomer,
  customerLogin,
  customerLogout,
  getCustomer,
  renewCustomerAccessToken,
} from './shopify';

interface CustomerStore {
  customer: ShopifyCustomer | null;
  accessToken: ShopifyCustomerAccessToken | null;
  isLoading: boolean;
  error: string | null;

  login: (input: CustomerLoginInput) => Promise<{ success: boolean; error?: string }>;
  register: (input: CustomerCreateInput) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  fetchCustomer: () => Promise<void>;
  renewToken: () => Promise<boolean>;
  clearError: () => void;

  isAuthenticated: () => boolean;
  isTokenExpired: () => boolean;
}

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set, get) => ({
      customer: null,
      accessToken: null,
      isLoading: false,
      error: null,

      login: async (input: CustomerLoginInput) => {
        set({ isLoading: true, error: null });

        try {
          const result = await customerLogin(input);

          if (result.errors && result.errors.length > 0) {
            const errorMessage = result.errors.map(e => e.message).join(', ');
            set({ error: errorMessage, isLoading: false });
            return { success: false, error: errorMessage };
          }

          if (result.accessToken) {
            set({ accessToken: result.accessToken });

            const customer = await getCustomer(result.accessToken.accessToken);
            if (customer) {
              set({ customer, isLoading: false });
              return { success: true };
            }
          }

          set({ error: 'Failed to login', isLoading: false });
          return { success: false, error: 'Failed to login' };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      register: async (input: CustomerCreateInput) => {
        set({ isLoading: true, error: null });

        try {
          const result = await createCustomer(input);

          if (result.errors && result.errors.length > 0) {
            const errorMessage = result.errors.map(e => e.message).join(', ');
            set({ error: errorMessage, isLoading: false });
            return { success: false, error: errorMessage };
          }

          if (result.customer) {
            const loginResult = await get().login({
              email: input.email,
              password: input.password,
            });

            return loginResult;
          }

          set({ error: 'Failed to create account', isLoading: false });
          return { success: false, error: 'Failed to create account' };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Registration failed';
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      logout: async () => {
        const { accessToken } = get();

        if (accessToken) {
          try {
            await customerLogout(accessToken.accessToken);
          } catch (error) {
            console.error('Error during logout:', error);
          }
        }

        set({
          customer: null,
          accessToken: null,
          error: null,
          isLoading: false,
        });
      },

      fetchCustomer: async () => {
        const { accessToken, isTokenExpired, renewToken } = get();

        if (!accessToken) return;

        if (isTokenExpired()) {
          const renewed = await renewToken();
          if (!renewed) {
            await get().logout();
            return;
          }
        }

        set({ isLoading: true });

        try {
          const customer = await getCustomer(accessToken.accessToken);
          if (customer) {
            set({ customer, isLoading: false });
          } else {
            // Token might be invalid, logout
            await get().logout();
          }
        } catch (error) {
          console.error('Error fetching customer:', error);
          set({ isLoading: false });
          // Don't logout on fetch error, might be network issue
        }
      },

      renewToken: async () => {
        const { accessToken } = get();

        if (!accessToken) return false;

        try {
          const result = await renewCustomerAccessToken(accessToken.accessToken);

          if (result.accessToken) {
            set({ accessToken: result.accessToken });
            return true;
          }

          return false;
        } catch (error) {
          console.error('Error renewing token:', error);
          return false;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      isAuthenticated: () => {
        const { customer, accessToken } = get();
        return !!(customer && accessToken && !get().isTokenExpired());
      },

      isTokenExpired: () => {
        const { accessToken } = get();

        if (!accessToken) return true;

        const expiresAt = new Date(accessToken.expiresAt);
        const now = new Date();

        const buffer = 5 * 60 * 1000;
        return expiresAt.getTime() - buffer < now.getTime();
      },
    }),
    {
      name: 'customer-storage',
      partialize: (state) => ({
        customer: state.customer,
        accessToken: state.accessToken,
      }),
    }
  )
);

if (typeof window !== 'undefined') {
  const store = useCustomerStore.getState();
  if (store.isAuthenticated()) {
    store.fetchCustomer();
  }
}
