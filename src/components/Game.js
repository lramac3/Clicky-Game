import React from "react";
import Header from "./Header";
import Row from "./Row";
import Col from "./Col";
import Container from "./Container";
import Span from "./Span";
import Paragraph from "./Paragraph";
import characters from "../characters.json";
import "./style.css";

class Game extends React.Component {
  state = {
    allPictures: characters, //contains the whole array of characters
    pictures: characters.slice(0, 8), //contains only 8 pictures from characters array
    score: 0, //has the score of the current game
    highscore: 0, //has the highest score of the current session
    message: "Click to Start!", //initial message for user
    alreadyPicked: [], //contains ids of all images user has clicked in current game
  };

  //when components are mounted, shuffle allPictures array and set state.pictures as the result
  //(which has first 8 images from the shuffled allPictures array)
  componentDidMount() {
    const newPictures = this.shuffle(this.state.allPictures);
    this.setState({ pictures: newPictures });
  }

  //when user clicks on an image
  handleClick = id => {
    //filter alreadyPicked array to see if the clicked image's id exists in it or not
    //if len===0, id does not exist in alreadyPicked array, else it exists
    const len = this.state.alreadyPicked.filter(idOfImage => idOfImage === id)
      .length;

    //if len===0, clicked id will be added to alreadyPicked array, else alreadyPicked will become []
    const newAlreadyPicked =
      len === 0 ? this.state.alreadyPicked.concat(id) : [];

    //if len===0, score of the current game will be incremented, else it becomes 0
    const newScore = len === 0 ? this.state.score + 1 : 0;

    //If there are still images left that are unclicked
    if (newScore < this.state.allPictures.length) {
      //set alreadyPicked array to newAlreadyPicked array initialize above
      this.setState(
        { alreadyPicked: newAlreadyPicked },
        //callback
        () => {
          //new pointer to this
          let that = this;
          //function to check if the 8 images shown on the page at least has one image unclicked
          (function loop() {
            //newPictures contain 8 images after shuffling that has at least one unclicked image
            let newPictures = that.shuffle(that.state.allPictures);
            //loop if newPicture is empty i.e the 8 images picked after shuffling allPictures are all clicked
            if (newPictures.length === 0) loop();
            //if 8 images in newPictures has at least one unclicked image, set pictures array to newPictures
            else that.setState({ pictures: newPictures });
          })();
        }
      );

      //if len===0, set the message to Guessed Correctly, else set it to Guessed Incorrectly
      const newMessage =
        len === 0 ? "Guessed Correctly" : "Guessed Incorrectly";
      //pointer to this
      const that = this;
      //javascript function to show new message after 1 second if user loses
      (function() {
        if (newMessage === "Guessed Incorrectly") {
          setTimeout(() => {
            that.setState({ message: "Click to start again!" });
          }, 1000);
        }
      })();

      //if len===0, set the highScore to current score if current score is greater that highScore, else dont change the high score
      const newHighScore =
        len === 0
          ? this.state.highscore < newScore
            ? newScore
            : this.state.highscore
          : this.state.highscore;

      //set message, score, highScore to variables initialzed above
      this.setState({
        message: newMessage,
        score: newScore,
        highscore: newHighScore,
      });
    }
    //If user has clicked on all the images once i.e game won
    else {
      //pointer to this
      const that = this;
      //change the state.message to show game won message, update score and high score
      that.setState({
        message: "You won!Game resetting..",
        score: that.state.score + 1,
        highscore: that.state.highscore + 1,
      });

      //javascript function to reset the game after waiting for 2 seconds
      (function() {
        setTimeout(() => {
          that.setState(
            {
              message: "Click to Start!",
              score: 0,
              allPictures: characters,
              alreadyPicked: [],
            },
            () => {
              //shuffle the pictures for the new game
              const newPictures = that.shuffle(that.state.allPictures);
              that.setState({ pictures: newPictures });
            }
          );
        }, 2000);
      })();
    }
  };

  //method to shuffle the images
  shuffle = arr => {
    //shuffle allPictures array
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
    }
    //pick first 8 pictures and check if there is any image that does not exist in alreadyPicked array yet
    for (let j = 0; j < 8; j++) {
      const len = this.state.alreadyPicked.filter(id => id === arr[j].id)
        .length;
      //as soon as we found the first image among the 8 images picked, that does not exist in alreadyPicked array yet,
      //return the first 8 images of the shuffled array of 16 images
      if (len === 0) return arr.slice(0, 8);
    }
    //if all first 8 images in shuffled array exist in alreadyPicked array, return empty array
    return [];
  };

  render() {
    return (
      <Container
        cls={`${
          this.state.message === "Guessed Incorrectly"
            ? "animated shake"
            : this.state.message === "Click to Start!"
            ? "animated fadeInUp"
            : this.state.message === "You won!Game resetting.."
            ? "animated flash"
            : ""
        }`}
      >
        <Row cls="game-heading">
          <Col size="md-12">
            <Span cls="game-name">CLICKY GAME</Span>
            <Paragraph>
              {" "}
              Click on a Game of Thrones character's image to earn points, but don't click on any more than
              once!
            </Paragraph>
          </Col>
        </Row>
        <Header
          message={this.state.message}
          score={this.state.score}
          highscore={this.state.highscore}
        />
        <Row cls="game-area">
          <Col size="md-1" />
          <Col size="md-10">
            {this.state.pictures.map(pic => (
              <img
                key={pic.id}
                alt={pic.name}
                src={pic.image}
                onClick={() => this.handleClick(pic.id)}
              />
            ))}
          </Col>
          <Col size="md-1" />
        </Row>
      </Container>
    );
  }
}
export default Game;
