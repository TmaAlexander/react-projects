import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Puff} from 'react-loader-spinner';
import {useNavigate} from 'react-router-dom';
import { ArticleContext } from '../context/ArticleContext';

// Api key
const apiKey = import.meta.env.VITE_YOUR_API_KEY

const Home = () => {
    // Set up the Article Context
    const {setSelectedArticle} = useContext(ArticleContext)
    // define useNavigate
    const navigate = useNavigate()
    // Set a state for News (all my articles)
    const [news, setNews] = useState([]);
    // Set a state for loading
    const [loading, setLoading] = useState(true);

    // useState definitions for all our inputs
    const [searchTerm, setSearchTerm] = useState('');
    const [country, setCountry] = useState('us');
    const [language, setLanguage] = useState('en');
    const [topic, setTopic] = useState('general');

    // useEffect- api call inside
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`
                https://newsapi.org/v2/top-headlines?country=${country}&language=${language}&category=${topic}&q=${searchTerm}&pageSize=100&apiKey=${apiKey}
                `)
                const articles = response.data.articles.map((article) => {
                    return {
                        ...article,
                        onSelect: () => setSelectedArticle(article)
                    }
                })
                console.log(articles);
                setNews(articles);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchNews()
    }, [country, language, topic, searchTerm, apiKey])

    return (
    <div>
        <div id='article-filters'>
        {/* Search Bar */}
        <div id='article-search'>
            <label htmlFor='search'>Search:</label>
            <input type='text' name='search' id='search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  />
        </div>

        {/* Country Select */}
        <div id='article-country'>
            <label htmlFor='country'>Country:</label>
            <select name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="ca">Canada</option>
                <option value="nz">New Zealand</option>
                <option value="gb">United Kingdom</option>
                <option value="us">United States</option>
            </select>
        </div>

        {/* Language Select */}
        <div id='article-language'>
            <label htmlFor="language">Language:</label>
            <select name="language" id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
            </select>
        </div>

        {/* Topic Select */}
        <div id='article-topic'>
            <label htmlFor="topic">Topic:</label>
            <select name="topic" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="general">General</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
            </select>
        </div>
        </div>

        {/* News Article Results */}
        <div id='article-results'>
            {loading ? (
                <Puff color='#00bfff' height={100} width={100} />
            ) : news.length === 0 ? (<p>No Articles</p>) : (
                news.map((item) => (
                    <div key={item.url} className='article-card'>
                        <h2>{item.title}</h2>
                        <p>{item.author}</p>
                        <p>*Source: {item.source.name}</p>
                        <img src={item.urlToImage} alt={item.title} />
                        <p>{item.description}</p>
                        <p>{item.publishedAt}</p>
                        <button onClick={() => {
                            item.onSelect()
                            navigate('/article/')
                            }
                        }>Read More</button>
                    </div>
                ))
            )
            }
        </div>
    </div>
    )
}

export default Home
