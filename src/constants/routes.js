export const ROUTES = {
  USER: {
    HOME: "/home",
    HOTEL_DETAIL: "/hotel/:id",
    CART: "/cart",
    CHECKOUT: "/checkout/:id",
    BILL: "/bill/:id",
  },
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN: {
    MANAGE_HOTEL_RESERVATIONS: "/admin/manage_hotel_reservations",
    MANAGE_HOTEL: "/admin/manage_hotel",
    MANAGE_REVIEW: "/admin/manage_review/:id",
    STATISTICAL: "/admin/statistical/:id",
    STATISTICAL_REVIEW: "/admin/statistical_review",
    CREATE_HOTEL: "/admin/create_hotel",
    UPDATE_HOTEL: "/admin/update_hotel/:id",
    CREATE_ROOM: "/admin/create_room/:id",
    UPDATE_ROOM: "/admin/update_room/:id",
  },
};
