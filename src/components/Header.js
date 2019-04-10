import React from "react";
import Row from "./Row";
import Col from "./Col";
import Span from "./Span";
import "./style.css";

const Header = props => (
  <Row cls="score">
    <Col size="md-4">
      <Span className="scoreboard">ScoreBoard</Span>
    </Col>
    <Col size="md-4">
      <Span>{props.message}</Span>
    </Col>
    <Col size="md-4">
      <Span>
        Score: {props.score} | Top Score: {props.highscore}
      </Span>
    </Col>
  </Row>
);

export default Header;
