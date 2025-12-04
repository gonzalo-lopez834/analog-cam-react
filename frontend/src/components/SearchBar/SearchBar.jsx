import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
  justify-content: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #333;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ClearButton = styled.button`
  padding: 10px 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

export const SearchBar = ({ searchTerm, onChange }) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Buscar productos por nombre o categoría..."
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar productos"
      />
      {searchTerm && (
        <ClearButton 
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
        >
          Limpiar
        </ClearButton>
      )}
    </SearchContainer>
  );
};
