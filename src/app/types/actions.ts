export interface State {
    loading: false,
    success: false,
    error: null,
}
//set type change based on the action
export type Action =
    | { type: "LOADING" }
    | { type: "SUCCESS"; payload: { isLiked: boolean } }
    | { type: "ERROR"; payload: string }
