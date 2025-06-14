"use client";

import OrderHistory from "../../../../components/customer/OrderHistory";

export default function OrdersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading-bold text-neutral-900 mb-2">
          Order History
        </h1>
        <p className="text-neutral-600">
          View and track all your orders
        </p>
      </div>

      <OrderHistory pageSize={10} />
    </div>
  );
}
