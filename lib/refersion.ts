export class RefersionUtils {
  static isLoaded(): boolean {
    return typeof window !== 'undefined' && !!window.r;
  }

  static waitForLoad(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isLoaded()) {
        resolve();
      } else if (typeof window !== 'undefined') {
        document.addEventListener("refersion-loaded", () => resolve(), { once: true });
        setTimeout(resolve, 10000);
      } else {
        resolve(); 
      }
    });
  }

  static getTrackingData() {
    if (typeof window === 'undefined') return null;
    
    return {
      id: localStorage.getItem("rfsn_v4_id"),
      aid: localStorage.getItem("rfsn_v4_aid"),
      cs: localStorage.getItem("rfsn_v4_cs"),
      url: window.location.href
    };
  }

  static getTrackingId(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem("rfsn_v4_id") : null;
  }

  static getAffiliateId(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem("rfsn_v4_aid") : null;
  }

  static getCampaignSource(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem("rfsn_v4_cs") : null;
  }

  static isAffiliateVisitor(): boolean {
    const affiliateId = this.getAffiliateId();
    const trackingId = this.getTrackingId();
    return !!(affiliateId || trackingId);
  }

  static async sendCheckoutEvent(cartId: string): Promise<boolean> {
    try {
      await this.waitForLoad();
      
      if (!this.isLoaded()) {
        console.warn('Refersion not loaded, cannot send checkout event');
        return false;
      }

      const trackingData = this.getTrackingData();
      if (!trackingData) {
        console.warn('No Refersion tracking data found');
        return false;
      }

      window.r.sendCheckoutEvent(
        cartId,
        trackingData.id,
        trackingData.url,
        trackingData.aid,
        trackingData.cs
      );

      return true;
    } catch {
      return false;
    }
  }

  static async sendCustomEvent(eventName: string, eventData: any = {}): Promise<boolean> {
    try {
      await this.waitForLoad();
      
      if (!this.isLoaded()) {
        console.warn('Refersion not loaded, cannot send custom event');
        return false;
      }

      if (window.r.sendCustomEvent) {
        const trackingData = this.getTrackingData();
        window.r.sendCustomEvent(eventName, {
          ...eventData,
          ...trackingData
        });
        return true;
      }
      
      return false;
    } catch {
      return false;
    }
  }
}