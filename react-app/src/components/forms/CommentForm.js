import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCommentThunk, deleteCommentThunk } from '../../store/comments';
import { SubmittedContext } from '../context/SubmittedContext';
import styles from '../cssModules/CommentForm.module.css'

const CommentForm = ({ comments, cardId }) => {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [commentMode, setCommentMode] = useState(false)
    const { setHasSubmitted } = useContext(SubmittedContext)
    const inputRef = useRef(null)

    const submitComment = async (e) => {
        e.preventDefault()
        const input = {
            content,
            cardId
        }
        await dispatch(createCommentThunk(input))
        setContent('')
        setHasSubmitted(prev => !prev)
    }

    const deleteComment = async (commentId) => {
        await dispatch(deleteCommentThunk(commentId))
        setHasSubmitted(prev => !prev)
    }

    useEffect(() => {
        if (commentMode) {
            inputRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [inputRef, commentMode])

    return (
        <form className={styles.form}>
            <div className={styles.header}>Activity</div>
            {comments?.map(comment => (
                <div className={styles.commentContainer} key={comment.id}>
                    <div className={styles.commentText}>{comment.content}</div>
                    <span className={`material-symbols-outlined ${styles.trashIcon}`} onClick={() => deleteComment(comment.id)}>delete</span>
                </div>
            ))}
            <div className={commentMode ? styles.activeInputContainer : styles.inactiveInputContainer}>
                <input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onFocus={() => setCommentMode(true)}
                    className={styles.inputBar}
                    placeholder="Write a comment..."
                    maxLength={100}
                    ref={inputRef}
                />
                {commentMode && (
                    <div className={styles.commentFooter}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button type='submit' className={styles.button} disabled={content.length === 0} onClick={e => submitComment(e)} >Save</button>
                            <button className={styles.Xbutton} onClick={() => setCommentMode(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div>{content.length}/100 characters</div>
                    </div>
                )}
            </div>
        </form>
    )
}

export default CommentForm;
