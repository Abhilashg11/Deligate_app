import { useState } from 'react';
import {SearchBar} from '../../displayComponents/SearchBar'
import Card from '../../displayComponents/card'
import FilterChips from '../../displayComponents/filterChips'
import { View } from 'react-native';

export const ComponentRenderer = ({ metadata, data }) => {
  const [filter, setFilter] = useState("ALL");
const FIELD_MAP = { 
  search : SearchBar,
   card : Card, 
   filterchips : FilterChips
   }
  // ✅ Define all data sources here
  const dataSources = {
    rawData: data,

    filteredData:
      filter === "ALL"
        ? data
        : data.filter((item) => item.status === filter),
  };

  return (
    <View >
      {metadata.map((field, index) => {
        const Component = FIELD_MAP[field.type];

        if (!Component) return null;

        // 🔥 Handle LIST-like components
        if (field.dataSource) {
          const sourceData = dataSources[field.dataSource];

          return sourceData.map((item) => (
            <Component
                key={item.id}
                item={item}
                config={field.props}   
            />
          ));
        }

        // 🔥 Handle normal components
        if (field.type === "filterchips") {
          return (
            <Component
              key={index}
              {...field.props}
              selected={filter}
              onSelect={setFilter}
            />
          );
        }

        return <Component key={index} {...field.props} />;
      })}
    </View>
  );
};