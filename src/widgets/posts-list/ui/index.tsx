import {useEffect, useState} from 'react'
import {PostItem} from '../../../entities/Post'
import {postApi} from '../../../entities/Post/model/PostsService'
import {useInView} from 'react-intersection-observer';
import s from './styles.module.scss'
import {IPost} from '../../../app/types/IPost'

const CURRENT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_POSTS: IPost[] = [];
const DEFAULT_TOTAL_POSTS = 100;
const ONE_PAGE = 1;
const DEFAULT_THRESHOLD = 0.00001;

export const PostsList = () => {
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    const [posts, setPosts] = useState<IPost[]>(DEFAULT_POSTS)
    const [totalPosts, setTotalPosts] = useState(DEFAULT_TOTAL_POSTS)

    const {ref} = useInView({
        threshold: DEFAULT_THRESHOLD,
        onChange: (inView) => {
            if (inView && (posts.length < totalPosts)) {
                setCurrentPage(currentPage + ONE_PAGE)
            }
        }
    });

    const {data, isLoading} = postApi.useFetchAllPostsQuery({limit: CURRENT_LIMIT, page: currentPage})

    useEffect(() => {
        if (data) {
            setTotalPosts(data.totalCount)
            setPosts([...posts, ...data.apiResponse])
        }
    }, [data])

    return (
        <div className={s.posts}>
            {posts && posts.map(post =>
                <PostItem key={post.id} post={post} />
            )}
            {!isLoading && <span ref={ref} />}
            {isLoading && <h1>Загрузка...</h1>}
        </div>
    )
}