import s from './Title.module.scss'

export interface TitleProps {
    textOfTitle: string;
}

const Title = ({textOfTitle: text_of_title}: TitleProps) => {
    return (
        <div className={s.title}>
            {text_of_title}
        </div>
    )
}

export default Title