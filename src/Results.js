import React, {useEffect} from "react";
import { Card } from 'semantic-ui-react'

const Results = (props) => {

 return (
   <Card>
    <Card.Content>
      <Card.Header>{props.country ?
                          props.city ?
                          `${props.city}, ${props.country}` : props.country
                          :
                          "No location selected"
                   }
      </Card.Header>
    </Card.Content>
      <Card.Group>
         {props.articles ?
              props.articles.map(article => <Card fluid color='red' header={article.title} href={article.link}/>)
           :
              <Card fluid color ='yellow' header='no results'/>
         }
      </Card.Group>
    </Card>
 );
};

export default Results;
