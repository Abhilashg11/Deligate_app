import { useState } from 'react';
import { SearchBar } from '../../displayComponents/SearchBar';
import Card from '../../displayComponents/card';
import FilterChips from '../../displayComponents/filterChips';
import { ScrollView, View } from 'react-native';
import { Header } from '../../displayComponents/header/index';
import { FAB } from '../../displayComponents/FAB';

export const ComponentRenderer = ({ metadata, data, computed = {}, onEvent }) => {
  const [filter, setFilter] = useState('ALL');
  const [searchText, setSearchText] = useState('');

  const FIELD_MAP = {
    search: SearchBar,
    card: Card,
    filterchips: FilterChips,
    header: Header,
    fab: FAB,
  };

  // ✅ Pipelines
  const pipelines = {
    filteredData: ({ rawData, filter, searchText }) => {
      let result = rawData;

      if (filter !== 'ALL') {
        result = result.filter(item => item.status === filter);
      }

      if (searchText) {
        const text = searchText.toLowerCase();
        result = result.filter(item =>
          item.name?.toLowerCase().includes(text) ||
          item.role?.toLowerCase().includes(text)
        );
      }

      return result;
    },
  };

  const dataSources = {
    rawData: data,
    filteredData: pipelines.filteredData({
      rawData: data,
      filter,
      searchText,
    }),
  };

  // ✅ Template parser
  const parseTemplate = (template, computed) => {
    if (!template) return '';
    return template.replace(/{(.*?)}/g, (_, key) => computed[key] ?? '');
  };

  // ✅ Resolve props
  const resolveProps = (props = {}) => {
    const newProps = {};

    Object.keys(props).forEach(key => {
      const value = props[key];

      if (value?.template) {
        newProps[key] = {
          ...value,
          text: parseTemplate(value.template, computed),
        };
      } else {
        newProps[key] = value;
      }
    });

    return newProps;
  };

  // 🔥 SPECIAL HANDLERS
  const specialHandlers = {
    fab: ({ Component, resolvedProps, index }) => ({
      type: 'floating',
      element: (
        <Component
          key={index}
          {...resolvedProps}
          resolveProps={resolvedProps}
          onPress={() => onEvent?.(resolvedProps.event)}
        />
      ),
    }),

    filterchips: ({ Component, resolvedProps, index }) => ({
      type: 'normal',
      element: (
        <Component
          key={index}
          {...resolvedProps}
          selected={filter}
          onSelect={setFilter}
        />
      ),
    }),

    header: ({ Component, resolvedProps, index }) => ({
      type: 'normal',
      element: (
        <Component
          key={index}
          {...resolvedProps}
          onBack={() => onEvent?.('onBack')}
          onAction={() => onEvent?.(resolvedProps?.action?.event)}
        />
      ),
    }),

    search: ({ Component, resolvedProps, index }) => ({
      type: 'normal',
      element: (
        <Component
          key={index}
          {...resolvedProps}
          value={searchText}
          onChangeText={setSearchText}
        />
      ),
    }),
  };

  const normalComponents = [];
  const scrollComponents = [];
  const floatingComponents = [];

  metadata.forEach((field, index) => {
    const Component = FIELD_MAP[field.type];
    if (!Component) return;

    const resolvedProps = resolveProps(field.props);

    let result;

    // ✅ Use special handler if exists
    if (specialHandlers[field.type]) {
      result = specialHandlers[field.type]({
        Component,
        resolvedProps,
        index,
      });
    }

    // ✅ Default list handling
    else if (field.dataSource) {
      const source = dataSources[field.dataSource] || [];

      result = {
        type: field.scroll ? 'scroll' : 'normal',
        element: source.map(item => (
          <Component
            key={item.id}
            item={item}
            config={resolvedProps}
            onEvent={onEvent}
          />
        )),
      };
    }

    // ✅ Default component
    else {
      result = {
        type: field.scroll ? 'scroll' : 'normal',
        element: <Component key={index} {...resolvedProps} />,
      };
    }

    // ✅ Push to correct bucket
    if (result.type === 'floating') {
      floatingComponents.push(result.element);
    } else if (result.type === 'scroll') {
      scrollComponents.push(result.element);
    } else {
      normalComponents.push(result.element);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Fixed */}
      <View>{normalComponents}</View>

      {/* Scroll */}
      {scrollComponents.length > 0 && (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {scrollComponents}
        </ScrollView>
      )}

      {/* Floating */}
      {floatingComponents}
    </View>
  );
};