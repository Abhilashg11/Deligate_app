import { useState } from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';

import { SearchBar } from '../../displayComponents/SearchBar';
import Card from '../../displayComponents/card';
import FilterChips from '../../displayComponents/filterChips';
import { Header } from '../../displayComponents/header';
import { FAB } from '../../displayComponents/FAB';
import { LicenseUpload } from '../../systemComponents/licenseUpload/LicenseUpload'
import { DateInput } from '../../systemComponents/date';
import { FormRenderer } from '../formRenderer';
import { DisplayText } from '../../displayComponents/text';
import { Button } from '../../displayComponents/button';
import { handleSubmit } from '../../../handlers/handleEvents';
import { DocumentUpload } from '../../systemComponents/documentUpload/DocumentUpload';
import { LonTool } from '../../systemComponents/lonTool/LonTool';
import { Dropdown } from '../../systemComponents/dropdown';
import { InputTile } from '../../systemComponents/inputTile/InputTile';

export const ComponentRenderer = ({ 
  metadata, 
  data = [],
   onEvent,
   role
  }) => {
  const [filter, setFilter] = useState('ALL');
  const [searchText, setSearchText] = useState('');
  const {components,submitButton} = metadata || {}



  const FIELD_MAP = {
    search: SearchBar,
    card: Card,
    filterchips: FilterChips,
    fab: FAB,
    licenseUpload: LicenseUpload,
    date: DateInput,
    form: FormRenderer,
    documentUpload: DocumentUpload,
    lontool: LonTool,
    dropdown: Dropdown,
    inputile: InputTile
  };

  // ✅ Filter logic
  const getFilteredData = () => {
    let result = data;

    if (filter !== 'ALL') {
      result = result.filter(item => item.status === filter);
    }

    if (searchText) {
      const text = searchText.toLowerCase();
      result = result.filter(
        item =>
          item.name?.toLowerCase().includes(text) ||
          item.role?.toLowerCase().includes(text),
      );
    }

    return result;
  };

  // 🔥 Special handlers
  const specialHandlers = {

    search: ({ Component, props, index }) => ({
      type: 'header',
      element: (
        <Component
          key={index}
          {...props}
          value={searchText}
          onChangeText={setSearchText}
        />
      ),
    }),

    filterchips: ({ Component, props, index }) => ({
      type: 'header',
      element: (
        <Component
          key={index}
          {...props}
          selected={filter}
          onSelect={setFilter}
        />
      ),
    }),

    card: ({ Component, props }) => {
      const list = getFilteredData();

      return {
        type: 'body',
        element: list.map((item,i) => (
          <Component
            key={`${item.id}-${i}`}
            item={item}
            config={props}
            onEvent={onEvent}
          />
        )),
      };
    },

    fab: ({ Component, props, index }) => ({
      type: 'floating',
      element: (
        <Component
          key={index}
          {...props}
          onPress={onEvent}
        />
      ),
    }),
  };

  const headerComponents = [];
  const bodyComponents = [];
  const floatingComponents = [];

  components.forEach((field, index) => {
    const Component = FIELD_MAP[field.type];
    if (!Component) return;

    const props = field.props || {};
    const handler = specialHandlers[field.type];

    let result;

    if (handler) {
      result = handler({ Component, props, index , name:field?.name });
    } else {
      result = {
        type: 'body',
        element: <View 
          key={`body-${index}`} 
        style={{borderTopWidth:1,paddingTop: 20 
          ,borderColor: '#EAEAEA'}}>
          <Component key={`${field.type}-${field.name || index}`} name={field?.name} {...props} />
          </View>,
      };
    }

    if (result.type === 'header') {
      headerComponents.push(result.element);
    } else if (result.type === 'floating') {
      floatingComponents.push(result.element);
    } else {
     if (Array.isArray(result.element)) {
    bodyComponents.push(...result.element); // ✅ flatten
    } else {
    bodyComponents.push(result.element);
}
    }
  });

  // ✅ Submit handler


  return (
    <>
      <View style={{ flex: 1 }}>

        {/* 🔹 HEADER (FIXED) */}
        <View>{headerComponents}</View>

        {/* 🔹 SCROLLABLE BODY */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {bodyComponents}
        </ScrollView>


        {/* 🔹 FLOATING COMPONENTS */}
        {floatingComponents}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 5,
    paddingBottom: 60, // space for button
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: '#fff',
    // padding: 12,
    marginHorizontal: 10,
    borderColor: '#EAEAEA',
  },

});