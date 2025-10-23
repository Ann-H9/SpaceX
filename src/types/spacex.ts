export interface Launch {
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch_small?: string;
    mission_patch?: string;
  };
  details?: string;
}