import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    image: {
        width: '150px',
        objectFit: 'cover'
    }
}));

const ModalDisplay = (props) => {
    const classes = useStyles()

    const handleClose = () => {
        props.setOpen(false)
    }

    return (
        <Modal
            className={classes.root}
            open={props.open}
            onClose={handleClose}
        >
            <div className={classes.paper}>
                <img src={`https://storage.googleapis.com/nvissystem/${props.person.picture_filename}`} className={classes.image} alt={`${props.person.first_name} ${props.person.last_name}`} />
                <h2>{`${props.person.first_name} ${props.person.last_name}`}</h2>
                <ul>
                    <li>{`Home Address: ${props.person.street}, ${props.person.city}, ${props.person.state} ${props.person.zip}`}</li>
                    <li>{`Emergency Contact: ${props.person.emergency_name}`}</li>
                    <li>{`Emergency Contact Phone: ${props.person.emergency_phone}`}</li>
                    <li>{`Emergency Contact Address: ${props.person.emergency_address}`}</li>
                </ul>
            </div>
        </Modal>
    )
}

export default ModalDisplay