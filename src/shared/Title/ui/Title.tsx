import s from './Title.module.scss'

export interface TitleProps {
    text_of_title: string;
}

const Title = ({text_of_title}: TitleProps) => {
    return (
        <div className={s.title}>
            {text_of_title}
        </div>
    )
}

export default Title