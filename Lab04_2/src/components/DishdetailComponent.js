import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderDish(dish) {
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    if (comments != null) {
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {/* tham khảo từ bài khác chỉnh sửa lại 1 số chỗ để fixbug */}
                {comments.map(c => {
                        return <div>
                            <div>{c.comment}</div>
                            <div> {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}
                            </div>
                        </div>
                    })}
            </div>
        );
    } else {
        return (
            <div>
                {/* rỗng */}
            </div>
        )
    }
}

const  DishDetail = (props) => {
    const comment = props.dish != null ? props.dish.comments : null;
    return (
        <div>
            <div>
                <RenderDish dish = {props.dish}/>
            </div>
            <div>
                <RenderComments comments={comment}/>
            </div>
        </div>
    )
} 

export default DishDetail;