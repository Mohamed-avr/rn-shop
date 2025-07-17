import {
  View,
  Text,
  StyleSheet,
  ListRenderItem,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";

import { ORDERS } from "../../../../assets/orders";
import { Order, OrderStatus } from "../../../../assets/types/order";
import { Link, Stack } from "expo-router";

const statusDisplayText: Record<OrderStatus, string> = {
  Pending: "Pending",
  Completed: "Completed",
  Shipped: "Shipped",
  InTransit: "In Transit",
};

const renderItem: ListRenderItem<Order> = ({ item }) => (
  <Link href={`/orders/${item.slug}`} asChild>
    <Pressable style={styles.orderContainer}>
      <View style={styles.orderContent}>
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.orderItem}> {item.item}</Text>
          <Text style={styles.orderDetails}> {item.details}</Text>
          <Text style={styles.orderDate}> {item.date}</Text>
        </View>
        <View
          style={[styles.statusBadge, styles[`statusBadge_${item.status}`]]}
        >
          <Text
            style={[
              styles.statusText,
              styles[`statusBadgeText_${item.status}`],
            ]}
          >
            {statusDisplayText[item.status]}
          </Text>
        </View>
      </View>
    </Pressable>
  </Link>
);

export default function Orders() {
  return (
    <View style={styles.container}>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles: { [key: string]: any } = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderContainer: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  orderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDetailsContainer: {
    flex: 1,
  },
  orderItem: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderDetails: {
    fontSize: 14,
    color: "#555",
  },
  orderDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "medium",
  },
  statusBadge_Pending: {
    backgroundColor: "#FFF9E0",
  },
  statusBadge_Completed: {
    backgroundColor: "#D0FFD3",
  },
  statusBadge_Shipped: {
    backgroundColor: "#E3F3FF",
  },
  statusBadge_InTransit: {
    backgroundColor: "#FFE3BA",
  },
  statusBadgeText_Pending: {
    color: "#ffcc00",
  },
  statusBadgeText_Completed: {
    color: "#4caf50",
  },
  statusBadgeText_Shipped: {
    color: "#2196f3",
  },
  statusBadgeText_InTransit: {
    color: "#ff9800",
  },
});
