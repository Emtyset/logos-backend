import { useTimer } from 'react-timer-hook'

function Timer({timeGiven, autoStart}) {

    let expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timeGiven);
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({ expiryTimestamp, autoStart, onExpire: () => console.warn('onExpire called') });
    
    let firstStart = true
    return (
      <div id='timer' onClick={isRunning? pause : resume}>
        <p>{seconds + minutes * 60}s</p>
      </div>
    );
  }

export default Timer