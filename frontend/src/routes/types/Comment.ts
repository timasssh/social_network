export default interface Comment {
    id: number,
    parent_comment_id: null | number,
    parent_post_id: null | number,
    author_username: string
    message: string
    created_at: Date
}