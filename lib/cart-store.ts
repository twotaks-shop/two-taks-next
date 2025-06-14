import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
	id: string;
	variantId: string;
	productId: string;
	title: string;
	variantTitle?: string;
	price: number;
	quantity: number;
	image: string;
	handle: string;
	sellingPlanId?: string;
	sellingPlanName?: string;
	isSubscription?: boolean;
}

interface CartStore {
	items: CartItem[];
	isOpen: boolean;
	addItem: (item: Omit<CartItem, "quantity">) => void;
	removeItem: (variantId: string, sellingPlanId?: string) => void;
	updateQuantity: (
		variantId: string,
		quantity: number,
		sellingPlanId?: string,
	) => void;
	clearCart: () => void;
	openCart: () => void;
	closeCart: () => void;
	toggleCart: () => void;
	getTotalItems: () => number;
	getTotalPrice: () => number;
	getItemKey: (variantId: string, sellingPlanId?: string) => string;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],
			isOpen: false,

			addItem: (newItem) => {
				const items = get().items;
				const itemKey = get().getItemKey(newItem.variantId, newItem.sellingPlanId);
				const existingItem = items.find(
					(item) => get().getItemKey(item.variantId, item.sellingPlanId) === itemKey,
				);

				if (existingItem) {
					set({
						items: items.map((item) =>
							get().getItemKey(item.variantId, item.sellingPlanId) === itemKey
								? { ...item, quantity: item.quantity + 1 }
								: item,
						),
					});
				} else {
					set({
						items: [...items, { ...newItem, quantity: 1 }],
					});
				}
			},

			removeItem: (variantId, sellingPlanId) => {
				const itemKey = get().getItemKey(variantId, sellingPlanId);
				set({
					items: get().items.filter(
						(item) =>
							get().getItemKey(item.variantId, item.sellingPlanId) !== itemKey,
					),
				});
			},

			updateQuantity: (variantId, quantity, sellingPlanId) => {
				if (quantity <= 0) {
					get().removeItem(variantId, sellingPlanId);
					return;
				}

				const itemKey = get().getItemKey(variantId, sellingPlanId);
				set({
					items: get().items.map((item) =>
						get().getItemKey(item.variantId, item.sellingPlanId) === itemKey
							? { ...item, quantity }
							: item,
					),
				});
			},

			clearCart: () => {
				set({ items: [] });
			},

			openCart: () => {
				set({ isOpen: true });
			},

			closeCart: () => {
				set({ isOpen: false });
			},

			toggleCart: () => {
				set({ isOpen: !get().isOpen });
			},

			getTotalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0);
			},

			getTotalPrice: () => {
				return get().items.reduce(
					(total, item) => total + item.price * item.quantity,
					0,
				);
			},

			getItemKey: (variantId, sellingPlanId) => {
				return sellingPlanId ? `${variantId}-${sellingPlanId}` : variantId;
			},
		}),
		{
			name: "cart-storage",
		},
	),
);
