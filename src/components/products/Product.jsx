import { Button } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from "react-router-dom";


const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { title, userId, body } = state;
  return (
    <div className="container">
      <h4 className="text-capitalize">{title}</h4>
      <p className="text-muted">{userId}</p>
      <p className="w-50 my-5">{body}</p>
      <Button variant="secondary" onClick={()=>navigate(-1)}>
        <IoMdArrowRoundBack />
      </Button>
    </div>
  );
};

export default Product;
