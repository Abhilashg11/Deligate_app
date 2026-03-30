import { useState } from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';

import { SearchBar } from '../../displayComponents/SearchBar';
import Card from '../../displayComponents/card';
import FilterChips from '../../displayComponents/filterChips';
import { Header } from '../../displayComponents/header';
import { FAB } from '../../displayComponents/FAB';
import { DocumentUpload } from '../../systemComponents/DocumentUpload';
import { DateInput } from '../../systemComponents/date';
import { FormRenderer } from '../formRenderer';
import { DisplayText } from '../../displayComponents/text';
import { Button } from '../../displayComponents/button';
import { handleSubmit } from '../../../handlers/handleEvents';

export const ComponentRenderer = ({ metadata, data = [], onEvent}) => {
  const [filter, setFilter] = useState('ALL');
  const [searchText, setSearchText] = useState('');
  const {components,submitButton} = metadata || {}

  const methods = useForm();

  const FIELD_MAP = {
    search: SearchBar,
    card: Card,
    filterchips: FilterChips,
    header: Header,
    fab: FAB,
    documentUpload: DocumentUpload,
    date: DateInput,
    form: FormRenderer,
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
    header: ({ Component, props, index }) => ({
      type: 'header',
      element: (
        <Component
          key={index}
          {...props}
          onBack={() => onEvent?.('onBack')}
          onAction={() => onEvent?.(props?.action?.event)}
        />
      ),
    }),

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
            key={item.id || `card-${i}`}
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
          onPress={() => onEvent?.(props.event)}
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
          <Component key={index} name={field?.name} {...props} />
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
  const handleFormSubmit = async(formData) => {
    const res = await handleSubmit(formData,submitButton?.event)
    console.log("Form submit result:", res);
  }
  const onError = (errors) => {
  console.log("❌ VALIDATION ERRORS", errors);
};

  return (
    <FormProvider {...methods}>
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

        {/* 🔹 SUBMIT BUTTON */}
        {submitButton && 
        <View style={styles.footer}>
         <Button
          title={submitButton?.label}
          onPress={ // 👈 check this
    methods.handleSubmit(handleFormSubmit,onError)}
          colors={[]}
  />
        </View>
        }

        {/* 🔹 FLOATING COMPONENTS */}
        {floatingComponents}
      </View>
    </FormProvider>
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