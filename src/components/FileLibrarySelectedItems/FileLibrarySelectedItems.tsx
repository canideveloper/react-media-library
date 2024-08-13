import React, { useContext } from 'react';
import { ReactMediaLibraryContext } from '../../context/ReactMediaLibraryContext';
import { FileLibrarySelectedItemsProps } from '../../../types';
import { List, Card, Button } from 'antd';

const FileLibrarySelectedItems: React.FC<FileLibrarySelectedItemsProps> = ({
                                                                               itemComponent = (item) => (
                                                                                   <Card hoverable style={{ width: 240 }} cover={<img alt="example" src={item.thumbnailUrl} />}>
                                                                                       <Card.Meta title={item.title} description={item.description} />
                                                                                   </Card>
                                                                               ),
                                                                           }: FileLibrarySelectedItemsProps) => {
    const { selectedItems, filesSelectCallback, filesDeleteCallback } =
        useContext(ReactMediaLibraryContext);

    return (
        <div>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={selectedItems}
                renderItem={item => (
                    <List.Item key={`item-${item._id}`}>
                        {itemComponent(item)}
                    </List.Item>
                )}
            />
            <div style={{ marginTop: 16 }}>
                {filesDeleteCallback !== undefined && (
                    <Button danger onClick={() => filesDeleteCallback(selectedItems)}>
                        Delete {selectedItems.length > 1 ? `${selectedItems.length} Files` : 'File'}
                    </Button>
                )}
                <Button type="primary" onClick={() => filesSelectCallback && filesSelectCallback(selectedItems)} style={{ marginLeft: 8 }}>
                    Select {selectedItems.length > 1 ? `${selectedItems.length} Files` : 'File'}
                </Button>
            </div>
        </div>
    );
};

export default FileLibrarySelectedItems;
