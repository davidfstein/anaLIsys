import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AnalysisProgressModal = (props) => {

    return <div>
        <Modal isOpen={props.modal}>
            <ModalHeader>Analyzing game...</ModalHeader>
            <ModalBody>
                <CircularProgressbar value={props.percentage} text={`${props.percentage}%`} />
            </ModalBody>
        </Modal>
    </div>
}

export default AnalysisProgressModal;