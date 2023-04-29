
const UserIconImage = (props) => {

    // return <div className="user-icon-image" style={{width:props.width, height:props.height}}>{props.color}</div>;
    return <img className="user-icon-image" src={props.imageURL} style={{width:props.width, height:props.height}} />
}

export default UserIconImage;