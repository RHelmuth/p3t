import React, { useState } from "react";
import {
  Container,
  Row,
  Form,
  Button,
  Table
} from 'react-bootstrap';
import './App.css';

const App = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [symbolFilter, setSymbolFilter] = useState("");
  const [dteFilter, setDteFilter] = useState("");
  const [mprofitFilter, setMprofitFilter] = useState("");
  const [mlossFilter, setMlossFilter] = useState("");
  const [mpoddsFilter, setMpoddsFilter] = useState("");
  const [mloddsFilter, setMloddsFilter] = useState("");
  const [ivrFilter, setIvrFilter] = useState("");
  const [p3tFilter, setP3tFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({});

  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let parsedData = [];
    try {
      parsedData = JSON.parse(text);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }

    setData(parsedData);
  };

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.column === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ column, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    sortableData = sortableData.map((item) => {
      item.expectancy = item.mprofit * item.mpodds - item.mloss * item.mlodds;
      return item;
    });

    if (symbolFilter) {
      sortableData = sortableData.filter((item) => item.symbol == symbolFilter);
    }

    if (dteFilter) {
      sortableData = sortableData.filter((item) => item.days > dteFilter);
    }

    if (mprofitFilter) {
      sortableData = sortableData.filter((item) => item.mprofit > mprofitFilter);
    }

    if (mlossFilter) {
      sortableData = sortableData.filter((item) => item.mloss < mlossFilter);
    }

    if (mpoddsFilter) {
      sortableData = sortableData.filter((item) => item.mpodds*100 > mpoddsFilter);
    }

    if (mloddsFilter) {
      sortableData = sortableData.filter((item) => item.mlodds*100 > mloddsFilter);
    }

    if (ivrFilter) {
      sortableData = sortableData.filter((item) => item.ivr*100 > mloddsFilter);
    }

    if (p3tFilter) {
      sortableData = sortableData.filter((item) => item.expectancy > p3tFilter);
    }


    if (sortConfig.column) {
      sortableData.sort((a, b) => {
        if (sortConfig.direction === 'ascending') {
          return a[sortConfig.column] > b[sortConfig.column] ? 1 : -1;
        } else {
          return a[sortConfig.column] < b[sortConfig.column] ? 1 : -1;
        }
      });
    }
    return sortableData;
  }, [data, sortConfig, mpoddsFilter]);
  
  return (
    <Container fluid>
     <Row className="mx-auto mt-3 mb-2 p-1">
      <Form onSubmit={handleSubmit}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <Button type="submit" variant="outline-secondary" size="small" className="mb-2">Submit</Button>
      </Form>
      {data.length > 0 && (
        <Table responsive size="sm" className="sticky text-light border border-secondary text-center">
          <thead>
            <tr>
            <th onClick={() => handleSort('symbol')}>
                Symbol
                {<br></br>}
                <input type="text" placeholder="Filter ..." value={symbolFilter} onChange={(e) => setSymbolFilter(e.target.value.toUpperCase())}/>
                {sortConfig.column === 'symbol' ? (
                  sortConfig.direction === 'ascending' ? '  🔼' : ' 🔽'
                ) : null}
              </th>
              <th onClick={() => handleSort('text')}>
                Strikes
                {sortConfig.column === 'text' ? (
                  sortConfig.direction === 'ascending' ? '  🔼' : ' 🔽'
                ) : null}
              </th>
              <th onClick={() => handleSort('days')}>
                DTE
                {<br></br>}
                <input type="text" placeholder="Filter ..." value={dteFilter} onChange={(e) => setDteFilter(e.target.value)}/>
                {sortConfig.column === 'days' ? (
                  sortConfig.direction === 'ascending' ? '  🔼' : ' 🔽'
                ) : null}
              </th>
              <th onClick={() => handleSort('mprofit')}>
                Max Profit
                {<br></br>}
                <input type="text" placeholder="Filter ..." value={mprofitFilter} onChange={(e) => setMprofitFilter(e.target.value)}/>
                {sortConfig.column === 'mprofit' ? (
                  sortConfig.direction === 'ascending' ? '🔼' : '🔽'
                ) : null}
                </th>
                <th onClick={() => handleSort('mloss')}>
                Max Loss
                {<br></br>}
                <input type="text" placeholder="Filter ..." value={mlossFilter} onChange={(e) => setMlossFilter(e.target.value)}/>
                {sortConfig.column === 'mloss' ? (
                  sortConfig.direction === 'ascending' ? '🔼' : '🔽'
                ) : null}
              </th>
              <th onClick={() => handleSort('mpodds')}>
                Chance Max Profit {<br></br>}
                <input type="text" placeholder="Filter ..." value={mpoddsFilter} onChange={(e) => setMpoddsFilter(e.target.value)}/>
                {sortConfig.column === 'mpodds' ? (
                  sortConfig.direction === 'ascending' ? '🔼' : '🔽'
                ) : null}
              </th>
              <th onClick={() => handleSort('mlodds')}>
                Chance Max Loss
                {<br></br>}
                <input type="text" placeholder="Filter ..." value={mloddsFilter} onChange={(e) => setMloddsFilter(e.target.value)}/>
                {sortConfig.column === 'mlodds' ? (
                  sortConfig.direction === 'ascending' ? '🔼' : '🔽'
                ) : null}
              </th>
              <th onClick={() => handleSort('IV Rank')}>
                IV Rank
                {<br></br>}
                <input type="text" placeholder="Filter ..." value={ivrFilter} onChange={(e) => setIvrFilter(e.target.value)}/>
                {sortConfig.column === 'IV Rank' ? (
                  sortConfig.direction === 'ascending' ? '🔼' : '🔽'
                ) : null}
              </th>
              <th onClick={() => handleSort('expectancy')}>
                Probable Profit Per Trade (P3T)
                {<br></br>}
                <input type="text" placeholder="Filter ..." value={p3tFilter} onChange={(e) => setP3tFilter(e.target.value)}/>
                {sortConfig.column === 'expectancy' ? (
                  sortConfig.direction === 'ascending' ? '🔼' : '🔽'
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td>{item.symbol}</td>
                <td>{item.text}</td>
                <td>{item.days}</td>
                <td>{dollarUS.format(Math.round(item.mprofit))}</td>
                <td>{dollarUS.format(Math.round(item.mloss))}</td>
                <td>{Math.round(item.mpodds*100)}%</td>
                <td>{Math.round(item.mlodds*100)}%</td>
                <td>{Math.round(item.ivr)}%</td>
                <td>{dollarUS.format(Math.round(item.expectancy))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </Row>
      </Container>
  );
};

export default App;
