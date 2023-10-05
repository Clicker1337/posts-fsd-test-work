import s from './styles.module.scss'

import {useNavigate, useParams} from "react-router-dom"
import {postApi} from "../../../entities/Post/model/PostsService";
import {Comment} from '../../../entities/comment';

export const PostDetailed = () => {
    const {id} = useParams();
    const idPost = Number(id);

    const {data: post, error, isLoading} = postApi.useFetchOnePostsQuery(idPost)
    const {data: comments} = postApi.useFetchCommentsBelowPostQuery(idPost)

    const navigate = useNavigate()

    return (
        <div className={s.detailed_post}>
            {isLoading && <h1>Идет загрузка</h1>}
            {error && <h1>Ошибка при подключении поста</h1>}
            {post &&
                <div className={s.hero}>
                    <div className={s.id}>{post.id}</div>
                    <section className={s.text}>
                        <h1>{post.title}</h1>
                        <h3>{post.body}</h3>
                    </section>
                    <section className={s.comments}>
                    {comments && comments.map(comment => 
                        <Comment key={comment.id} comment={comment}/>
                        )}
                    </section>
                </div>
            }
            <button onClick={() => navigate('/posts')}>Назад</button>
        </div>
    )
}