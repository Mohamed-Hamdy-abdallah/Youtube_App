import React from 'react'
import axios from 'axios'
import FormatNumber from "./FormatNumber";
import ErrorBoundary from "./ErrorBoundary"
class Watcharea extends React.Component {
    constructor(){
        super();
        this.state={loading:true};
    }
    UserList = async () => {
        
        await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,status,player&key=${process.env.REACT_APP_API_KEY}&id=${this.props.id}`)
              .then((res)=>{
                  const item = res.data.items[0];
                  this.setState({
                    title:item.snippet.title,
                    views:item.statistics.viewCount,
                    channel:item.snippet.channelTitle,
                    like:item.statistics.likeCount,
                    description:item.snippet.description,
                    url:item.id,
                    loading:false
                  })
              }).catch((error)=>console.log(error))
    }

    componentDidMount(){
       
        this.UserList();
    }
    render(){
        const {title , views , channel , like , description , url} = this.state ;

        return(<>
        {this.state.loading && <h1 className='loader'></h1>}
            <div className='watch-area'>
                <div className='player'>
                    <iframe src={`//www.youtube.com/embed/${url}`} title={title} width='1080' height='450' frameBorder='0' allow='autoplay encrypted-media'></iframe>
                </div>
               <h1> {title}</h1>
               <div className='video-info'>
               <div>
              <FormatNumber number={views} /> Views
            </div>
            <div>
              <FormatNumber number={like} /> Likes
            </div>
               </div>
               <div className='channel-name'>{channel} channel</div>
               <p>{description}</p>
            </div>
            </>
        )
    }
}

 export default function WatchAreaWithErrorBoundary(props) {
    return (
      <ErrorBoundary>
        <Watcharea {...props} />
      </ErrorBoundary>
    );
  }
