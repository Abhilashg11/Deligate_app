import React from 'react';
import { View } from 'react-native';
import {
  Files,
  ChevronRight,
  UserRoundPen,
  ClipboardClock,
  Settings,
  LogOut,
  CircleX,
  BrushCleaning,
  LocateFixed,
  ArrowLeft,
  Bubbles,
  Bell,
  Search,
  ShieldCheck,
  Palette,
  Languages,
  Info,
  Mail,
  FileChartColumn,
  CircleQuestionMark,
  Sun,
  MoonStar,
  CircleCheckBig,
  RefreshCw,
  ClockFading,
  Droplets,
  CupSoda,
  Calendar,
  Truck,
  Route,
  AlertCircle,
  Camera,
  Eye,
  EyeClosed,
  EyeOff,
  ChevronLeft,
  ChevronDown,
  Check,
  Box,
  Upload,
  Square,
  Map,
  FileText,
  Clock,
  Wrench,
  ClipboardList,
  Lock,
  UserPlus,
  House,
  Users,
  UserPen,
  Shield,
  X,
  User
} from 'lucide-react-native';

const ICON_MAP = {
  Files,
  ChevronRight,
  UserRoundPen,
  ClipboardClock,
  Settings,
  LogOut,
  CircleX,
  Calendar,
  BrushCleaning,
  LocateFixed,
  ArrowLeft,
  Bubbles,
  Bell,
  UserPen,
  ShieldCheck,
  Palette,
  Mail,
  Search,
  Languages,
  Info,
  FileChartColumn,
  CircleQuestionMark,
  Sun,
  MoonStar,
  CircleCheckBig,
  RefreshCw,
  ClockFading,
  Droplets,
  CupSoda,
  Truck,
  Route,
  AlertCircle,
  Camera,
  Eye,
  Upload,
  EyeClosed,
  EyeOff,
  ChevronLeft,
  ChevronDown,
  Check,
  Box,
  Square,
  Map,
  FileText,
  Clock,
  Wrench,
  UserPlus,
  Lock,
  House,
  Users,
  ClipboardList,
  Shield,
  X,
  User
};

const LucideIcon = ({ icon_name, size = 24, color = '#000', style, strokeWidth }) => {
  const IconComponent = ICON_MAP[icon_name];

  if (!IconComponent) {
    console.warn(`Lucide icon "${icon_name}" not found.`);
    return null;
  }

  return (
    <View style={style}>
      <IconComponent size={size} color={color} strokeWidth={strokeWidth} />
    </View>
  );
};

export default LucideIcon;
