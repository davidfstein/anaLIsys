import '../styles/usericon.css';
import UserIconImage from './usericonimage';

const UserIcon = (props) => {
    
    return <div className='user-icon-container'>
            <UserIconImage imageURL={props.imageURL} color={props.color} height={props.height} width={props.width}/>
            <p className='user-icon-username'>{props.username}</p> 
            <p className='user-icon-rating'>({props.rating})</p>
        </div>;
}

export default UserIcon;