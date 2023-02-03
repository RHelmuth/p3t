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
  const [mpoddsFilter, setMpoddsFilter] = useState("");
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

    if (mpoddsFilter) {
      sortableData = sortableData.filter((item) => item.mpodds*100 > mpoddsFilter);
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
        <Table responsive size="sm" className="sticky text-light border border-secondary">
          <thead>
            <tr>
            <th onClick={() => handleSort('symbol')}>
                Symbol
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
                {sortConfig.column === 'days' ? (
                  sortConfig.direction === 'ascending' ? '  🔼' : ' 🔽'
                ) : null}
              </th>
              <th onClick={() => handleSort('mprofit')}>
                Max Profit
                {sortConfig.column === 'mprofit' ? (
                  sortConfig.direction === 'ascending' ? '🔼' : '🔽'
                ) : null}
                </th>
                <th onClick={() => handleSort('mloss')}>
                Max Loss
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
                {sortConfig.column === 'mlodds' ? (
                  sortConfig.direction === 'ascending' ? '🔼' : '🔽'
                ) : null}
              </th>
              <th onClick={() => handleSort('IV Rank')}>
                IV Rank
                {sortConfig.column === 'IV Rank' ? (
                  sortConfig.direction === 'ascending' ? '🔼' : '🔽'
                ) : null}
              </th>
              <th onClick={() => handleSort('expectancy')}>
                Probable Profit Per Trade (P3T)
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
