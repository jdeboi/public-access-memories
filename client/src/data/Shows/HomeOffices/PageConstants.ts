let val = 0;
export const HOME_PAGE = val++;
export const CHAIRS_PAGE = val++;
export const RECYCLE_PAGE = val++;
export const COFFEE_PAGE = val++;
export const ALTAR_PAGE = val++;
export const BLINDS_PAGE = val++;
export const REDSOFA_PAGE = val++;
export const SNAKE_PAGE = val++;
export const CAL_PAGE = val++;

export const GUESTBOOK_PAGE = val++;

export const POSTER_PAGE = val++;
export const SMOKE_PAGE = val++;
export const FLAME_PAGE = val++;
export const SWEDEN_PAGE = val++;
export const FRUIT_PAGE = val++;
export const PURSE_PAGE = val++;
export const CLOCK_PAGE = val++;
export const GIFT_PAGE = val++;

export const getLayoutSlug = (layoutNum: number) => {
  switch (layoutNum) {
    case HOME_PAGE:
      return "home";
    case CHAIRS_PAGE:
      return "chair";
    case RECYCLE_PAGE:
      return "recycle";
    case COFFEE_PAGE:
      return "coffee";
    case ALTAR_PAGE:
      return "altar";
    case BLINDS_PAGE:
      return "blinds";
    case REDSOFA_PAGE:
      return "redsofa";
    case SNAKE_PAGE:
      return "snake";
    case CAL_PAGE:
      return "cal";

    case GUESTBOOK_PAGE:
      return "guestbook";
      
    case POSTER_PAGE:
      return "poster";
    case SMOKE_PAGE:
      return "smoke";
    case FLAME_PAGE:
      return "flame";
    case SWEDEN_PAGE:
      return "sweden";
    case FRUIT_PAGE:
      return "fruit";
    case PURSE_PAGE:
      return "purse";
    case CLOCK_PAGE:
      return "clock";
    case GIFT_PAGE:
      return "gift";
    default:
      return "home";
  }
};
