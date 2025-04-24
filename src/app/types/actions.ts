export interface State {
    loading: boolean;
    success: boolean;
    error: null | string;
}
//set type change based on the action
export type Action =
    | { type: "LOADING" }
    | { type: "SUCCESS"; payload: { isLiked: boolean } }
    | { type: "ERROR"; payload: string }
