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
            console.log(currentPage, '= page')
        }
    }, [posts.length, totalCount, currentPage]);

    useEffect(() => {
        if (isFetching && data) {
            const newPosts = [...posts, ...data.apiResponse]
            const newTotalCount = data.totalCount;
            const newPage = currentPage + 1;

            setPosts(newPosts)
            setTotalCount(newTotalCount)
            setCurrentPage(newPage)
            setIsFetching(false)
        }
    }, [isFetching, data, currentPage, posts])

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