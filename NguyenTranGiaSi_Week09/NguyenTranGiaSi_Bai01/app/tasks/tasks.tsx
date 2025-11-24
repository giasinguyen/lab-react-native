import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalSearchParams, router } from 'expo-router';
import * as SQLite from 'expo-sqlite';
const go = () => {
    router.push({
        pathname: '/tasks',
        params: { name: name || 'Twinkle' },
    });
};
import { C } from '../../constants/color';
import TaskItem from '../../components/TaskItem';

interface ItemEntity {
    id: number;
    done: boolean;
    value: string;
}

async function migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
    const res = await db.getAllAsync<{ user_version: number }>("PRAGMA user_version;");
    const user_version = res?.[0]?.user_version ?? 0;

    const DATABASE_VERSION = 1;

    if (user_version < DATABASE_VERSION) {
        await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        done INTEGER,
        value TEXT
      );
      PRAGMA user_version = ${DATABASE_VERSION};
    `);
    }
}

async function addItemAsync(db: SQLite.SQLiteDatabase, text: string): Promise<void> {
    if (text.trim() !== '') {
        await db.runAsync("INSERT INTO items (done, value) VALUES (?, ?);", false, text);
    }
}

async function getAllItemsAsync(db: SQLite.SQLiteDatabase): Promise<ItemEntity[]> {
    return db.getAllAsync<ItemEntity>("SELECT * FROM items ORDER BY id DESC");
}

async function toggleDoneAsync(db: SQLite.SQLiteDatabase, id: number, done: boolean) {
    await db.runAsync("UPDATE items SET done = ? WHERE id = ?;", !done, id);
}

async function deleteItemAsync(db: SQLite.SQLiteDatabase, id: number) {
    await db.runAsync("DELETE FROM items WHERE id = ?;", id);
}

async function updateItemValueAsync(db: SQLite.SQLiteDatabase, id: number, value: string) {
    await db.runAsync("UPDATE items SET value = ? WHERE id = ?;", value, id);
}

export default function TasksScreen() {
    const { name = "Twinkle" } = useGlobalSearchParams<{ name?: string }>();
    const [items, setItems] = useState<ItemEntity[]>([]);
    const [text, setText] = useState("");
    const [dbInstance, setDbInstance] = useState<SQLite.SQLiteDatabase | null>(null);

    useEffect(() => {
        const setupDatabase = async () => {
            try {
                const db = await SQLite.openDatabaseAsync("tasks.db");
                await migrateDbIfNeeded(db);
                setDbInstance(db);
            } catch (error) {
                console.error("Database error:", error);
            }
        };

        setupDatabase();
    }, []);

    const loadItems = async () => {
        if (!dbInstance) return;
        try {
            const data = await getAllItemsAsync(dbInstance);
            setItems(data);
        } catch (err) {
            console.error("Load items error:", err);
        }
    };

    useEffect(() => {
        if (dbInstance) {
            loadItems();
        }
    }, [dbInstance]);

    const handleAdd = async () => {
        if (!dbInstance || text.trim() === "") return;
        await addItemAsync(dbInstance, text);
        setText("");
        await loadItems();
    };

    const handleToggleDone = async (item: ItemEntity) => {
        if (!dbInstance) return;
        await toggleDoneAsync(dbInstance, item.id, item.done);
        await loadItems();
    };

    const handleEdit = async (item: ItemEntity, id: number) => {
        if (!dbInstance || text.trim() === "") return;
        await updateItemValueAsync(dbInstance, item.id, text);
        await loadItems();
    };


    const handleDelete = async (id: number) => {
        if (!dbInstance) return;
        await deleteItemAsync(dbInstance, id);
        await loadItems();
    };

    return (
        <SafeAreaView style={styles.wrap}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()} style={{ padding: 6 }}>
                    <Ionicons name="chevron-back" size={20} color={C.text} />
                </TouchableOpacity>
                <View style={styles.profileBox}>
                    <Image source={require('../../assets/my-avatar.png')} style={styles.avatar} />
                    <View>
                        <Text style={styles.hi}>Hi {name}</Text>
                        <Text style={styles.sub}>Have a great day ahead</Text>
                    </View>
                </View>
            </View>

            <View style={styles.searchRow}>
                <Ionicons name="search" size={16} color="#9CA3AF" style={{ marginHorizontal: 10 }} />
                <TextInput
                    placeholder="Add task"
                    placeholderTextColor="#9CA3AF"
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={handleAdd}
                    style={styles.searchInput}
                />
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <TaskItem
                        title={item.value}
                        done={item.done}
                        onToggleDone={() => handleToggleDone(item)}
                        onDelete={() => handleDelete(item.id)}
                        onEdit={() => handleEdit(item, item.id)}
                    />
                )}
            />

            <TouchableOpacity
                style={styles.fab}
                activeOpacity={0.9}
                onPress={handleAdd}
            >
                <Ionicons name="add" size={26} color={C.white} onPress={go} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrap: { flex: 1, backgroundColor: C.white, paddingHorizontal: 16 },
    headerRow: { flexDirection: "row", alignItems: "center", marginTop: 6, paddingHorizontal: 16 },
    profileBox: { flexDirection: "row", alignItems: "center", marginLeft: 4 },
    avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 10 },
    hi: { fontSize: 16, fontWeight: "700", color: C.text },
    sub: { color: C.muted, marginTop: 2 },
    searchRow: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        color: C.text,
        fontSize: 14,
    },
    fab: {
        position: "absolute",
        bottom: 28,
        alignSelf: "center",
        width: 58,
        height: 58,
        borderRadius: 29,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: C.teal,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
});
