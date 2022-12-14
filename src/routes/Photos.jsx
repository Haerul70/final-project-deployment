import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePhoto = async (id) => {
    // TODO: answer here
     await fetch(`http://localhost:3001/photos/${id}`, {
        method: 'DELETE',
      })
      .then((response) => response.json()) 
      .then((json) => console.log(json))
      setPhotos(photos.filter((dataPhotos) => dataPhotos.id !== id));
  };

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    const data = () => {
      try {
        const isQueryParams = { _sort: "id", _order: `${sort}`, q: `${submited}` };
        const isSearchParams = new URLSearchParams(isQueryParams);
        fetch(`https://gallery-app-server.vercel.app/photos?${isSearchParams}`)
          .then((response) => response.json()) // mengubah response menjadi JSON
          .then((json) => console.log(json)); // menampilkan response yang sudah dalam format JSON
        } catch(error) {
          console.log(error);
        }
          setLoading(false);
      }
      data();
  }, [sort, submited]);

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
  const data = async() => {
      try{
        await fetch("http://localhost:3001/photos")
        .then((response) => response.json()) // mengubah response menjadi JSON
        .then((json) => setPhotos(json)); // menampilkan response yang sudah dalam format JSON
        setLoading(false)
      }
      catch (error){
        console.log(error);
      }
      setLoading(false)
    }
    data();
  }, []);

  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;