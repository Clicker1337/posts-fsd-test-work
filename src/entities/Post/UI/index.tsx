import s from './styles.module.scss'
import {IPost} from '../../../app/types/IPost';
import ButtonLink, {routes} from '../../../features/button';
import {useInView} from 'react-intersection-observer';

export interface PostItemProps {
    post: IPost;
}

export const PostItem = ({post}: PostItemProps) => {
    const {ref, inView} = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });


    return (
        <div className={s.post} ref={ref} >
            {inView ?
                <>
                    <div className={s.wrapper}>
                        <div className={s.title}>
                            <h1>{post.id}</h1><h2>{post.title}</h2>
                        </div>
                        <p>{post.body}</p>
                    </div>
                    {ButtonLink(routes.POST, 'Просмотр', post.id)}
                </>
                :
                <div>
                    nothing
                </div>
            }

        </div>
    )
}