import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { DisplayText } from '../text';

export const Header = ({ title, subtitle, meta, onBack, action, onAction ,backButton }) => {

  return (
    <View style={{ marginBottom: 4, gap: 13 }}>
      {/* Top Row */}

      {/* Back */}
      {backButton && onBack && (
        <TouchableOpacity onPress={onBack}>
          <DisplayText>{'< Back'}</DisplayText>
        </TouchableOpacity>
      )}

      <View style={styles.actionContainer}>
        <View>
          {/* Meta */}
          {meta && (
            <DisplayText style={styles.meta(meta)}>{meta.template}</DisplayText>
          )}

          {/* Title */}
          {title && (
            <DisplayText style={styles.title(title)}>
              {title.template}
            </DisplayText>
          )}

          {/* Subtitle (dynamic) */}
          {subtitle && (
            <DisplayText style={styles.subtitle(subtitle)}>
              {subtitle.template}
            </DisplayText>
          )}
        </View>
        <View>
          {/* Action Button */}
          {action && (
            <TouchableOpacity onPress={onAction}>
              <DisplayText>{action.icon || '⚙️'}</DisplayText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: meta => ({
    fontSize: meta.size || 12,
    color: meta?.color || '#0D5F7A',
    marginTop: 5,
  }),
  title: meta => ({
    fontSize: meta.size || 20,
    color: meta?.color || 'gray',
    marginTop: 5,
    fontWeight: 'bold',
  }),
  subtitle: meta => ({
    fontSize: meta.size || 12,
    color: meta?.color || 'gray',
    marginTop: 5,
  }),
});
