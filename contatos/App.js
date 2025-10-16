import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  ActivityIndicator,FlatList,Linking,RefreshControl,SafeAreaView,Text,TextInput,TouchableOpacity,View,StyleSheet,Alert,
} from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  cosst [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {

    (async () => {
      try {
        setLoading(true);
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg(
            "Permissão negada. Conceda acesso aos contatos para continuar."
          );
          setLoading(false);
          return;
        }

        await showContacts();
      } catch (err) {
        setErrorMsg("Ocorreu um erro ao solicitar permissão ou buscar contatos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const showContacts = useCallback(async () => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        pageSize: 2000,
        pageOffset: 0,
      });

      const sorted = [...data].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "", undefined, {
          sensitivity: "base",
          numeric: true,
        })
      );

      setContacts(sorted);

    } catch (err) {
      setErrorMsg("Não foi possível carregar os contatos.");
      console.error(err);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await showContacts();
    } finally {
      setRefreshing(false);
    }
  }, [showContacts]);


  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return contacts;
    return contacts.filter((c) => {
      const nameMatch = (c.name || "").toLowerCase().includes(term);
      const phoneMatch = (c.phoneNumbers || []).some((p) =>
        (p.number || "").replace(/\D/g, "").includes(term.replace(/\D/g, ""))
      );
      return nameMatch || phoneMatch;
    });
  }, [contacts, query]);

  const handlePressContact = (contact) => {
    const num = contact?.phoneNumbers?.[0]?.number;
    if (!num) {
      Alert.alert("Contato sem telefone", "Este contato não possui número registrado.");
      return;
    }
    const tel = `tel:${num}`;
    Linking.openURL(tel).catch(() =>
      Alert.alert("Erro", "Não foi possível abrir o discador.")
    );
  };

  const renderItem = ({ item }) => {
    const phone = item?.phoneNumbers?.[0]?.number || "Sem telefone";
    return (
      <TouchableOpacity style={styles.item} onPress={() => handlePressContact(item)}>
      <Text style={styles.itemName}>{item.name || "Sem nome"}</Text>
      <Text style={styles.itemPhone}>{phone}</Text>
      </TouchableOpacity>
    );
  };
  if (loading) {

    return (
    <SafeAreaView style={styles.center}>
    <ActivityIndicator size="large" />
    <Text style={styles.muted}>Carregando contatos…</Text>
    </SafeAreaView>
    );
  }
  if (errorMsg) {

    return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.error}>{errorMsg}</Text>
    <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
    <Text style={styles.refreshBtnText}>Tentar novamente</Text>
    </TouchableOpacity>
    </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

    <TextInput
        placeholder="Pesquisar por nome ou número…"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.search}
        clearButtonMode="while-editing"
      />

      <View style={styles.actions}>
      <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
      <Text style={styles.refreshBtnText}>Atualizar</Text>
      </TouchableOpacity>
      <Text style={styles.count}>
          {filtered.length} / {contacts.length}
      </Text>
      </View>

      <FlatList
              data={filtered}
              keyExtractor={(item) => item.id ?? item.recordID ?? String(Math.random())}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={styles.sep} />}
              refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={
      <View style={styles.center}>
      <Text style={styles.muted}>Nenhum contato encontrado.</Text>
      </View>
              }
              contentContainerStyle={filtered.length === 0 && { flex: 1 }}
              keyboardShouldPersistTaps="handled"
            />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  muted: { color: "#666" },
  error: { color: "#b00020", textAlign: "center", marginBottom: 12 },

  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  refreshBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  refreshBtnText: { fontWeight: "600" },
  count: { color: "#666" },
  item: { paddingVertical: 12 },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPhone: { marginTop: 2, color: "#666" },
  sep: { height: 1, backgroundColor: "#eee" },
});
 