import "./App.css";
import { useRandom } from "./hooks/useRandom";

const App = () => {
    const query = useRandom();
    return (
        <div className="App App-header">
            {query.isFetching ? (
                <h2>Cargando</h2>
            ) : (
                <h2>Número aleatorio: {query.data}</h2>
            )}

            {!query.isFetching && query.isError && <h2>{`${query.error}`}</h2>}

            <button onClick={() => query.refetch()}>Obtener otro numero</button>
        </div>
    );
};

export default App;
