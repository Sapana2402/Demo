import { Button, FlatList, Pressable, Text, View } from 'react-native';
import { database } from '.';
import withObservables from '@nozbe/with-observables';

function WatermelonScreen({ notes }: any) {
  const addNote = async () => {
    console.log('Added');

    await database.write(async () => {
      await database.get('notes').create(note => {
        note.title = 'New Note';
        note.content = 'This is a notesdfsad';
        note.isPinned = false;
      });
    });
    console.log('Added====', notes);
  };

  const deleteNote = async (note: any) => {
    await database.write(async () => {
      await note.markAsDeleted();
    });
  };

  const updateNote = async (note: any) => {
    await database.write(async () => {
      await note.update((n: any) => {
        n.title = 'Updated Title 1234';
        n.content = 'Updated Content';
      });
    });
  };

  const renderItem = ({ item }: any) => {
    const data = item._raw;
    return (
      <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <Text>{data.title}</Text>
          <View style={{ flexDirection: 'row' }}>
            {data.is_pinned && <Text>📌</Text>}
            <Pressable onPress={() => deleteNote(item)}>
              <Text>🗑</Text>
            </Pressable>
            <Pressable onPress={() => updateNote(item)}>
              <Text>✏️</Text>
            </Pressable>
          </View>
        </View>
        <Text>{data.content}</Text>
      </View>
    );
  };
  return (
    <View>
      <Button title="Add Note" onPress={addNote} />
      <Text>djksg</Text>
      <FlatList data={notes} renderItem={renderItem} />
    </View>
  );
}

const enhance = withObservables([], ({}) => ({
  notes: database.collections.get('notes').query().observe(),
}));

export default enhance(WatermelonScreen);
