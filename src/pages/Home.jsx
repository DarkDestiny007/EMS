import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div style={{ height: '600px', backgroundImage: 'url(https://www.clickvieweducation.com/_next/image?url=https%3A%2F%2Fcms.clickvieweducation.com%2Fwp-content%2Fuploads%2F2025%2F04%2FStrategies-to-Increase-Classroom-Discussion-How-to-Structure-Discussions-1024x576.png&w=2048&q=100)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      {/* section admin intro */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            {/*text content*/}
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eum omnis, nostrum vitae quidem aspernatur, debitis fuga id modi praesentium quae dolor quos ipsam rerum. Ea nulla aspernatur ipsum a!
              Impedit optio corrupti dignissimos, beatae sunt asperiores natus, voluptates tempora voluptas ducimus harum consequuntur voluptatum! Dignissimos necessitatibus placeat odio autem quos? Nesciunt, aliquam necessitatibus doloribus perspiciatis velit alias porro voluptatem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sequi dolorum aperiam iure non pariatur vel. Laudantium dicta iusto corporis sunt dolor, aliquam facilis nihil, exercitationem quibusdam neque eaque accusamus?</p>
          </div>
          <div className="col-lg-6">
            {/*image*/}
            <img className="img-fluid align-item-right" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtIU7E3x2EYvNYP_dM2NVGvkBLsNT0_P6B1w&s" alt="profile" />
          </div>
        </div>
<div className="text-center my-4">
          <Link to="/dashboard" className="btn btn-info">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
