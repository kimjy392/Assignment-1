import { useState, useEffect, useRef, useCallback } from 'react';
import Card from './Card.js'
import './App.css'

function App() {
  
  const [ data, setData ] = useState([])
  const [ page, setPage ] = useState(1)
  const target = useRef(null)
  const fetchData = useCallback(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`)
    .then(res => res.json())
    .then(res => {
      setData(data => data.concat(res))
      setPage(prePage => prePage + 1)
    })
  }, [page])

  useEffect(() => {
    let observer 
    if (target.current) {
      console.log(target.current)
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            fetchData()
          }
        })
      })
      observer.observe(target.current)
    }
    return () => observer && observer.disconnect()
  })
  
  useEffect(() => {
    fetchData()
  }, [])

  
  
  return (
    <div className="wrapper">
      {data.map((post, idx) => 
        <Card ref={data.length - 1 === idx ? target : null} key={idx} id={post.id} body={post.body} email={post.email}/>
      )}
    </div>
  );
}

export default App;
