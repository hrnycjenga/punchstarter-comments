import React from 'react';
import axios from 'axios';
import CommentList from './components/commentList.jsx';
import PostComment from './components/postComment.jsx';
import { Comment, Header } from 'semantic-ui-react';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: []
		};
		this.getComments = this.getComments.bind(this);
		this.addComment = this.addComment.bind(this);
	}

	componentDidMount() {
		this.getComments();
	}

	getComments() {
		const path = window.location.pathname;
		axios
			.get(`${path}messages`)
			.then(({ data }) => {
				console.log('Output: App -> getComments -> data', data);

				this.setState({ comments: data });
			})
			.catch((err) => console.log(err));
	}

	addComment(comment) {
		let newState = this.state.comments.concat(comment);
		this.setState({ comments: newState });
	}

	render() {
		return (
			<Comment.Group>
				<Header as="h3" dividing>
					Comments
				</Header>

				<CommentList comments={this.state.comments} />

				<PostComment addComment={this.addComment} />
			</Comment.Group>
		);
	}
}

export default App;
