import {Link} from 'react-router-dom';
import s from './styles.module.scss'

export enum routes {
    HOME = "/",
    POST = "/posts/",
    NOT_FOUND = "/404",
}

function ButtonLink(link: routes, title: string, id?: number) {
    return (
        <Link to={link + id} className={s.button}>
            <span>{title}</span>
        </Link>
    )
}

export default ButtonLink