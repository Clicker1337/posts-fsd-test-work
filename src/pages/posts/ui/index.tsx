import Title from '../../../shared/Title/ui/Title'
import {PostsList} from '../../../widgets/posts-list'
import s from './styles.module.scss'

export const PostsPage = () => {
    return (
        <div className={s.posts}>
            <Title text_of_title='ПОСТЫ' />
            <PostsList />
        </div>
    )
}