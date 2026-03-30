import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Linking,
} from 'react-native';
import LucideIcon from '../../displayComponents/icon/lucideIcons/LucideIcon';
import { DisplayText } from '../../displayComponents/text';
import { DateInput } from '../date';
import DatePicker from 'react-native-date-picker';
import { useController, useFormContext } from 'react-hook-form';
import { useTheme } from '../../../themes/ThemeProvider';
import DocumentPicker from 'react-native-document-picker';

export const DocumentUpload = ({
  title,
  name="",
  // file,
  expiryDate,
  postuploadicons: { eye, cancel } = {},
  dateMeta,
  label = 'hi',
  onUpload,
  onDelete,
  placeholder,
  rules,
  onView,
  required = false,
  defaultValue = null,
  date,
  onDateChange,
}) => {
  const [file, setFile] = useState();
  const { colors } = useTheme();
  const data = ['CMT', 'MTTP', 'Med Pass', 'BGM', 'Seizure Protocol'];
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState({});
  const [openIndex, setOpenIndex] = useState(null);
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: name,
    control,
    rules: {
      required: required?.display ? 'This field is required' : false,
      ...rules,
    },
    defaultValue,
  });

  useEffect(()=>{
    onChange(documents)
  },[documents])

  const handleView = async doc => {
    try {
      if (doc.uri) {
        const supported = await Linking.canOpenURL(doc.uri);
        if (supported) {
          await Linking.openURL(doc.uri);
        } else {
          console.log("Can't open this file type");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpload = async key => {
    try {
      // 1️⃣ Open file picker
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      // 2️⃣ Show loading
      setDocuments(prev => ({
        ...prev,
        [key]: { ...prev[key], loading: true },
      }));

      // 3️⃣ Simulate upload (replace with API call)
      setTimeout(() => {
        setDocuments(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            file: res.name,
            uri: res.uri,
            type: res.type,
            loading: false,
          },
        }));
      }, 1500);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled');
      } else {
        console.error(err);
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* Title Row */}
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.titleIcon}>
            <LucideIcon
              icon_name={title?.icon?.name}
              size={title?.icon?.size}
              color={title?.icon?.color}
            />
          </View>
          <DisplayText style={styles.title(title)}>{title.name}</DisplayText>
        </View>
        <View>
          {required.display && (
            <Text style={styles.required(required)}>{required?.name}</Text>
          )}
        </View>
      </View>

      {data.map((item, index) => {
        const key = item;
        const doc = documents[key] || {};

        return (
          <View key={key} style={styles.row}>
            {/* LEFT */}
            <View style={{ gap: 4 }}>
              <DisplayText>{item}</DisplayText>

              {/* FILE + DATE */}
              {doc.file || doc.date ? (
                <View style={{ flexDirection: 'row', gap: 8,alignItems:"center" }}>
                  {doc.file && (
                    <Text style={{ color: '#239EC4' }}>{doc.file}</Text>
                  )}
                  {doc.date ? (doc.date && (
                    <Text style={{ color: '#999' }}>- {doc.date}</Text>
                  )) : (<Pressable
                  onPress={() => setOpenIndex(index)}
                  style={styles.dateBox}
                >
                  <LucideIcon icon_name="Calendar" size={14} color="#999" />
                  <Text style={{ color: '#999' }}>Select expiry date</Text>
                </Pressable>)}
                </View>
              ) : (
                <Pressable
                  onPress={() => setOpenIndex(index)}
                  style={styles.dateBox}
                >
                  <LucideIcon icon_name="Calendar" size={14} color="#999" />
                  <Text style={{ color: '#999' }}>Select expiry date</Text>
                </Pressable>
              )}

              {/* DATE PICKER */}
              <DatePicker
                modal
                open={openIndex === index}
                date={new Date()}
                onConfirm={(selectedDate) => {
                  console.log("date....",selectedDate.toISOString().split('T')[0])
                  setOpenIndex(null);

                  setDocuments(prev => ({
                    ...prev,
                    [key]: {
                      ...prev[key],
                      date: selectedDate.toISOString().split('T')[0],
                    },
                  }));
                }}
                onCancel={() => setOpenIndex(null)}
              />
            </View>

            {/* RIGHT */}
            <View>
              {doc.loading ? (
                <Text style={{ fontSize: 12 }}>Uploading...</Text>
              ) : doc.file ? (
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity
                    style={styles.iconContainer({
                      backgroundColor: eye?.backgroundcolor || '#D3F4FF',
                      borderColor: eye?.bordercolor || '#239EC4',
                    })}
                    onPress={() => handleView(doc)}
                  >
                    <LucideIcon
                      icon_name="Eye"
                      size={18}
                      color={eye?.color || '#239EC4'}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.iconContainer({
                      backgroundColor: cancel?.backgroundcolor || '#F8EEEE',
                      borderColor: cancel?.bordercolor || '#FF0000',
                    })}
                    onPress={() => {
                      setDocuments(prev => {
                        const copy = { ...prev };
                        delete copy[key];
                        return copy;
                      });
                    }}
                  >
                    <LucideIcon
                      icon_name="X"
                      size={18}
                      color={cancel?.color || '#A82828'}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.uploadIcon}
                  onPress={() => handleUpload(key)}
                >
                  <LucideIcon icon_name="Upload" size={18} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },

  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: meta => ({
    fontWeight: '600',
    fontSize: meta?.size || 14,
  }),

  required: meta => ({
    color: meta?.color || 'orange',
    fontSize: meta?.size || 12,
  }),

  fileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  fileName: {
    fontWeight: '500',
  },

  fileMeta: {
    fontSize: 12,
    color: '#777',
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
  },

  iconBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#E6F4F9',
  },

  noFile: {
    color: '#aaa',
    marginBottom: 8,
  },

  uploadBtn: {
    marginTop: 10,
    backgroundColor: '#0a7ea4',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  titleIcon: {
    // borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#D3F4FF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10',
  },
  placeholderText: meta => ({
    fontSize: meta.fontsize || 10,
    color: meta.placeholdercolor || '#999999',
  }),
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },

  dateBox: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  uploadIcon: {
    backgroundColor: '#239EC4',
    padding: 10,
    borderRadius: 25,
  },
  iconContainer: props => ({
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: props.borderColor,
    backgroundColor: props.backgroundColor,
  }),
});
