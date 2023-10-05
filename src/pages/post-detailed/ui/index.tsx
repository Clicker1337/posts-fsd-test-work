import {PostDetailed} from '../../../widgets/post-detailed'
import s from './styles.module.scss'

export const PostDetailedPage = () => {
    return (
        <div className={s.post}>
            <PostDetailed></PostDetailed>
        </div>
    )
}