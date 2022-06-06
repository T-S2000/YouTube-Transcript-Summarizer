import React from 'react';
import Tabs from "./Tabs";
import ET from "../transcripts/English.txt";
import ML from "../transcripts/Malayalam.txt";
import loadingGif from "../assets/waiting.gif"

class BackendAPI extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			error: null,
			isLoaded: false,
			isLoading: false,
			failedMessage: null
		};
	}

	handleChange = (event) => {

		this.setState({ [event.target.name]: event.target.value });
	}

	componentDidMount(){

		this.setState({
			isLoading: true,
			isLoaded: false
		});
		console.log(window.location.href.slice(26))
		var FinalURL = `http://127.0.0.1:5000/api/?video_url=${window.location.href.slice(26)}`;
		
			fetch(FinalURL)
			.then(res => res.json())
			.then(
				(result) => {
					if (result.data.message === "Success") {
						this.setState({
							isLoaded: true,
							isLoading: false,
							message: result.data.message,
							englishTranscript: result.data.eng_summary,
							malayalamTranscript: result.data.mal_summary,
						});
					} else {
						this.setState({
							isLoaded: true,
							isLoading: false,
							failedMessage: result.data.error
						});
					}
				},

				(error) => {
					alert('An Error occured: ' + this.state);
					this.setState({
						isLoaded: true,
						isLoading: false,
						error: error
					});
				}
			)
		
		

		
			}
	

	stopAudio = () => {

		window.speechSynthesis.cancel();
	}

	textToAudio = () => {

		var synth = window.speechSynthesis;
		var utterance = new SpeechSynthesisUtterance(this.state.englishTranscript);
		synth.speak(utterance);

	}

	
	render() {

		const { isLoaded, isLoading, message, englishTranscript, malayalamTranscript, } = this.state;

		if (isLoading) {

			return (
				<>
					<center>
					<div 	className="lds-ripple"><div></div><div></div></div>
						{/* <div className='box'><div></div></div> */}
						{/* <img src={loadingGif} width="150" height="150"></img> */}
					</center>
					<Tabs>
						<div label="English">
							<div className="tab-content-1">
								English Summarized Text Will be Shown Here...
							</div>
						</div>
						<div label="Malayalam">
							<div className="tab-content-1">
								Malayalam Summarized Text Will be Shown Here...
							</div>
						</div>
					</Tabs>
				</>
			);
		} else if (isLoaded) {

			if (message === "Success") {

				return (
					<>
						<Tabs>
							<div label="English">
								<div className="tab-content">
									<div>
										<center>
											<button className="btn-1" type="button" onClick={this.textToAudio}>Speak</button>
											<button className="btn-1" type="button" onClick={this.stopAudio}>Stop</button>
										</center>
										<center>
										<a href={ET} className="buttonDownload" download="English_Transcript.txt" type="button">Download</a>
										</center>
									</div>
									{englishTranscript}
								</div>
							</div>
							<div label="Malayalam">
								<div className="tab-content">
									<div>
										<center>
										<a href={ML} className="buttonDownload" download="Malayalam_Transcript.txt" type="button">Download</a>
										</center>
									</div>
									{malayalamTranscript}
								</div>
							</div>
						</Tabs>
					</>
				);
			}

			else {

				return (
					<>
						<div>
							<br />
							Please use this extension in <a href='https://youtube.com'>Youtube</a>
						</div>
						<Tabs>
							<div label="English">
								<div className="tab-content-1">
									English Summarized Text Will be Shown Here...
								</div>
							</div>
							<div label="Malayalam">
								<div className="tab-content-1">
									Malayalam Summarized Text Will be Shown Here...
								</div>
							</div>
						</Tabs>
					</>
				);
			}

		}

		else {

			return (
				<>
					<Tabs>
						<div label="English">
							<div className="tab-content-1">
								English Summarized Text Will be Shown Here...
							</div>
						</div>
						<div label="Malayalam">
							<div className="tab-content-1">
								Malayalam Summarized Text Will be Shown Here...
							</div>
						</div>
					</Tabs>

				</>
			);
		}

	}
}

export default BackendAPI;