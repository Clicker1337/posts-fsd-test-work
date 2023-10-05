import {useCallback, useEffect, useState} from 'react'
import {PostItem} from '../../../entities/Post'
import {postApi} from '../../../entities/Post/model/PostsService'
import s from './styles.module.scss'
import {IPost} from '../../../app/types/IPost'

export const PostsList = () => {
    const currentLimit = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState<IPost[]>([])
    const [isFetching, setIsFetching] = useState(true)
    const [totalCount, setTotalCount] = useState(1)

    const {data} = postApi.useFetchAllPostsQuery({limit: currentLimit, page: currentPage})

    const scrollHandler = useCallback((): void => {
        if ((document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100)
        && (posts.length < totalCount)) {
            setIsFetching(true)
        }
    }, [posts, isFetching]);

    useEffect(() => {
        if (isFetching && data) {
            setPosts(prevPosts => [...prevPosts, ...data.apiResponse])
            setTotalCount(data.totalCount)
            setIsFetching(false)
            setCurrentPage(prevState => prevState + 1)
        }
    }, [isFetching, data])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        };
    }, [scrollHandler])

    return (
        <div className={s.posts}>
            {posts && posts.map(post =>
                <PostItem key={post.id} post={post} />
            )}
            {isFetching && <h1>Загрузка...</h1>}
        </div>
    )
}