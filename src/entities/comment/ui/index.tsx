import s from './styles.module.scss'
import {IComments} from '../../../app/types/IComments'

interface commentProps {
    comment: IComments;
}

export const Comment = ({comment}: commentProps) => {
  return (
    <div className={s.comment}>
        <h1>{comment.name}</h1>
        <h3>{comment.body}</h3>
    </div>
  )
}